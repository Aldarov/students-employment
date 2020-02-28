public class Group
{
    /// <summary>
    /// Код группы
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Код специальности
    /// </summary>
    public int SpecialityId { get; set; }

    /// <summary>
    /// Код формы обучения
    /// </summary>
    public int EducationFormId { get; set; }

    /// <summary>
    /// Наименование группы
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// Год окончания обучения
    /// </summary>
    public int LastYear { get; set; }
}
