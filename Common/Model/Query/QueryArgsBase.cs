namespace Common.Model.Query
{
    public class QueryArgsBase : IPaginationInfo, ISortInfo, IEmbedInfo, IFullTextSearchInfo
    {
        public int _page { get; set; } = 0;
        public int _limit { get; set; } = 0;
        public string _sort { get; set; }
        public string _order { get; set; }
        public string _embed { get; set; }
        public string q { get; set; }
    }
}