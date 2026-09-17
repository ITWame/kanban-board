namespace api.Models
{
    public class Issue
    {
        public Guid Id { get; set; }

        public string Priority { get; set; }

        public string Status { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public Issue(Guid id, string priority, string status, string title, string description, DateTime createdAt)
        {
            Id = id;
            Priority = priority;
            Status = status;
            Title = title;
            Description = description;
            CreatedAt = createdAt;
        }
    }
}