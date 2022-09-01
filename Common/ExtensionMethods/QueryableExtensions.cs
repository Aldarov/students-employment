using Common.Model.Query;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using System.Linq.Expressions;

namespace Server.Infrastructure
{
    public static class QueryableExtensions
    {
        public static List<T> ConvertFilter<T>(List<string> filter)
        {
            return filter
                .Select(x => (T)Convert.ChangeType(x, typeof(T)))
                .ToList();
        }

        private static Expression<Func<T, object>> ExpressionForSort<T>(string propertyName)
        {
            var parameter = Expression.Parameter(typeof(T));

            var nameProperties = propertyName.Split('.').ToList();
            Expression property = parameter;
            foreach (var item in nameProperties)
            {
                property = Expression.Property(property, item);
            }
            var propAsObject = Expression.Convert(property, typeof(object));

            return Expression.Lambda<Func<T, object>>(propAsObject, parameter);
        }

        private static Expression<Func<T, object>> ExpressionObject<T>(string propertyName)
        {
            var parameter = Expression.Parameter(typeof(T));
            var propAsObject = Expression.Convert(Expression.Property(parameter, propertyName), typeof(object));
            return Expression.Lambda<Func<T, object>>(propAsObject, parameter);
        }

        public static IQueryable<T> Paginate<T>(this IQueryable<T> source, IPaginationInfo pagination)
        {
            IQueryable<T> res = source;
            if (pagination._limit > 0)
            {
                res = source
                        .Skip((pagination._page) * pagination._limit)
                        .Take(pagination._limit);
            }
            return res;
        }

        public static PaginateResult<T> PaginateResult<T>(this IQueryable<T> source, IPaginationInfo pagination)
        {
            PaginateResult<T> result = new PaginateResult<T>();
            int count_rec = source.Count();
            int page = 0;
            IQueryable<T> query = source;
            if (pagination._limit > 0)
            {
                page = pagination._page;
                query = source
                        .Skip((pagination._page) * pagination._limit)
                        .Take(pagination._limit);
            }
            result.Data = query.ToList();
            result.Info = new PaginateInfo() { Limit = pagination._limit, Page = page, TotalRecord = count_rec };

            return result;
        }

        public static IQueryable<T> Sort<T>(this IQueryable<T> source, ISortInfo sortInfo)
        {
            if (sortInfo._sort != null)
            {
                IOrderedQueryable<T> query;
                var sortArray = sortInfo._sort.Split(',').Select(p => p.Trim()).ToArray();
                var orderArray = sortInfo._order == null ? null :
                    sortInfo._order.Split(',').Select(p => p.Trim()).ToArray();

                if (orderArray != null && orderArray.First() == "desc")
                {
                    query = source.OrderByDescending(ExpressionForSort<T>(sortArray.First()));
                }
                else
                {
                    query = source.OrderBy(ExpressionForSort<T>(sortArray.First()));
                }

                var i = 1;
                foreach (var sort in sortArray.Skip(1))
                {
                    if (orderArray != null && orderArray.Count() > i && orderArray[i] == "desc")
                    {
                        query = query.ThenByDescending(ExpressionForSort<T>(sort));
                    }
                    else
                    {
                        query = query.ThenBy(ExpressionForSort<T>(sort));
                    }
                    i++;
                }

                return query;
            }
            return source;
        }

        public static IQueryable<T> Filter<T>(this IQueryable<T> source, List<KeyValuePair<string, StringValues>> queryStrings)
        {
            IQueryable<T> query = source;
            var filters = queryStrings.Where(x => !x.Key.StartsWith("_") && x.Key != "q").ToList();

            foreach (var filter in filters)
            {
                var parameter = Expression.Parameter(typeof(T), "x");

                var nameProperties = filter.Key.Split('.').ToList();
                Expression property = parameter;
                foreach (var item in nameProperties)
                {
                    property = Expression.Property(property, item);
                }

                var ConvertFilterMethod = typeof(QueryableExtensions).GetMethod("ConvertFilter").MakeGenericMethod(property.Type);
                var filterValues = ConvertFilterMethod.Invoke(null, new object[] { filter.Value.ToList() });

                var methodInfo = filterValues.GetType().GetMethod("Contains", new Type[] { property.Type });

                //Expression.Call(объект, метод объекта, аргументы для метода)
                var call = Expression.Call(Expression.Constant(filterValues), methodInfo, property);

                var lambda = Expression.Lambda<Func<T, bool>>(call, parameter);

                query = query.Where(lambda);
            }
            return query;
        }

        public static IQueryable<T> Embed<T>(this IQueryable<T> source, List<KeyValuePair<string, StringValues>> queryStrings) where T : class
        {
            IQueryable<T> query = source;

            var embedList = queryStrings.Where(x => x.Key == "_embed").FirstOrDefault();
            if (embedList.Key != null)
            {
                foreach (var embed in embedList.Value)
                {
                    var embetArray = embed.Split('.').ToList();
                    var i = 0;
                    foreach (var item in embetArray)
                    {
                        if (i == 0)
                        {
                            query = query.Include(ExpressionObject<T>(item));
                        }
                        else
                        {
                            //query = query.ThenInclude(ExpressionObject<T>(item));
                        }
                        i++;
                    }
                }
            }
            return query;
        }
    }
}