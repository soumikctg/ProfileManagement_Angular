namespace ProfilesApi.Models
{
    public class PageItem
    {
        public PageItem()
        {
            Students = new List<Student>();
            Teachers = new List<Teacher>();
        }

        public int Total { get; set; }

        public List<Student> Students { get; set; }
        public List<Teacher> Teachers { get; set; }
    }
}
