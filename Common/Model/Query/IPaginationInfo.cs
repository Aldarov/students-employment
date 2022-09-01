namespace Common.Model.Query
{
    public interface IPaginationInfo
    {
        int _limit { get; }
        int _page { get; }
    }
}