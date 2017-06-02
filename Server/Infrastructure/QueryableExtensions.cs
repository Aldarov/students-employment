using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Microsoft.Extensions.Primitives;

namespace Server.Infrastructure
{
    public interface IPaginationInfo
    { 
        int _page { get; }
        int _limit { get; }
    }

    public interface ISortInfo
    {
        string _sort { get; }
        string _order { get; }
    }

    public class QueryArgsBase : IPaginationInfo, ISortInfo
    {
        public int _page { get; set; } = 1;
        public int _limit { get; set; } = 30;
        public string _sort { get; set; }
        public string _order { get; set; }
    }

    public static class QueryableExtensions
    {
        private static Expression<Func<T, object>> ExpressionForSort<T>(string propertyName)
        {
            var parameter = Expression.Parameter(typeof(T));
            var property = Expression.Property(parameter, propertyName);
            var propAsObject = Expression.Convert(property, typeof(object));

            return Expression.Lambda<Func<T, object>>(propAsObject, parameter);            
        }

        public static IQueryable<T> Paginate<T>(this IQueryable<T> source, IPaginationInfo pagination)
        {
            return source
                .Skip((pagination._page - 1) * pagination._limit)
                .Take(pagination._limit);
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

        public static T ChangeType<T>(string value)
        {
            var res = (T)Convert.ChangeType(value, typeof(T), CultureInfo.InvariantCulture);
            return res;
        }

        public static IQueryable<T> Filter<T>(this IQueryable<T> source, List<KeyValuePair<string, StringValues>> queryStrings)
        {
            IQueryable<T> query = source;
            var filters = queryStrings.Where(x => !x.Key.StartsWith("_") && x.Key != "q").ToList();

            foreach (var filter in filters)
            {
                var parameter = Expression.Parameter(typeof(T), "x");
                var property = Expression.Property(parameter, filter.Key);

                MethodInfo castMethod = typeof(QueryableExtensions).GetMethod("ChangeType").MakeGenericMethod(property.Type);

                var v = castMethod.Invoke(null, new object[] {filter.Value.First()});
                var val = filter.Value
                    .Select(x => castMethod.Invoke(null, new object[] {x}))
                    .ToList();

                var values = Expression.Constant(val);

                var methodInfo = val.GetType().GetMethod("Contains", new Type[] { property.Type });
                //var methodInfo = typeof(List<object>).GetMethod("Contains", new Type[] { typeof(object) });

                var call = Expression.Call(values, methodInfo, property);

                // var value = Expression.Constant(Convert.ChangeType(filter.Value.First(), property.Type, CultureInfo.InvariantCulture));
                // var equal = Expression.Equal(property, value);
                // var lambda = Expression.Lambda<Func<T, bool>>(equal, parameter);

                var lambda = Expression.Lambda<Func<T, bool>>(call, parameter);

                query = query.Where(lambda);
            }
            return query;
        }        
        
    }
}