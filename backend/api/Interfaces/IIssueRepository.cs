using api.Models;

namespace api.Interfaces
{
    public interface IIssueRepository
    {
        Task<List<Issue>> GetAllIssueAsync();
        Task<Issue?> GetIssueByIdAsync(Guid id);
        Task AddIssueAsync(Issue issue);
        Task UpdateIssueAsync(Issue issue);
        Task UpdateStatusAsync(Issue issue);
        Task DeleteIssueAsync(Guid id);
        Task Save();
    }
}