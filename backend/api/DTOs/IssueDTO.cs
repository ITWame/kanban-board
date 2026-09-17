using api.Models;

namespace api.DTOs
{
    public class IssueDTO
    {
        public string Priority { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
    }
}