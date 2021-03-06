using System.Collections.Generic;
using System.Linq;

namespace Server.Infrastructure
{
    public class PaginateInfo
    {
        public int Page { get; set; }
        public int Limit { get; set; }
        public int TotalRecord { get; set; }
    }

    public class PaginateResult<T> 
    {
        public IEnumerable<T> Data { get; set; }
        public PaginateInfo Info { get; set; }
    }
}