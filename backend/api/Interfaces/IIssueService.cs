using api.DTOs;
using api.Models;

namespace api.Interfaces
{
    public interface IIssueService
    {
        Task<List<Issue>> GetAllIssueAsync();
        Task<Issue> AddIssueAsync(IssueDTO issueDTO);
        Task UpdateIssueAsync(Guid id, IssueDTO issueDTO);
        Task UpdateStatus(Guid id, string status);
        Task DeleteIssueAsync(Guid id);
        Task<Issue> GetIssueByIdAsync(Guid id);
    }
}