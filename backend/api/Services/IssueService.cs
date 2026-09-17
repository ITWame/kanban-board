using api.DTOs;
using api.Interfaces;
using api.Models;

namespace api.Services
{
    public class IssueService : IIssueService
    {
        private readonly IIssueRepository _issueRepository;

        public IssueService(IIssueRepository issueRepository)
        {
            _issueRepository = issueRepository;
        }
        public async Task<Issue> AddIssueAsync(IssueDTO issueDTO)
        {
            var issue = new Issue(Guid.NewGuid(), issueDTO.Priority, issueDTO.Status, issueDTO.Title, issueDTO.Description, DateTime.UtcNow);

            await _issueRepository.AddIssueAsync(issue);

            await _issueRepository.Save();

            return issue;
        }

        public async Task DeleteIssueAsync(Guid id)
        {
            await _issueRepository.DeleteIssueAsync(id);

            await _issueRepository.Save();
        }

        public async Task<List<Issue>> GetAllIssueAsync()
        {
            return await _issueRepository.GetAllIssueAsync();
        }

        public async Task<Issue> GetIssueByIdAsync(Guid id)
        {
            var issue = await _issueRepository.GetIssueByIdAsync(id);

            if (issue == null)
            {
                throw new KeyNotFoundException("Issue not found");
            }

            return issue;
        }

        public async Task<string> UpdateIssueAsync(Guid id, IssueDTO issueDTO)
        {
            var issue = await _issueRepository.GetIssueByIdAsync(id);

            if (issue == null)
            {
                return "Could not find the issue";
            }

            issue.Priority = issueDTO.Priority;
            issue.Status = issueDTO.Status;
            issue.Title = issueDTO.Title;
            issue.Description = issueDTO.Description;

            await _issueRepository.UpdateIssueAsync(issue);

            await _issueRepository.Save();

            return "Successfully updated the issue";
        }

        public async Task UpdateStatus(Guid id, string status)
        {
            var issue = await _issueRepository.GetIssueByIdAsync(id) ?? throw new KeyNotFoundException("Issue not found");

            issue.Status = status;

            await _issueRepository.UpdateStatusAsync(issue);

            await _issueRepository.Save();
        }

        async Task<List<Issue>> IIssueService.GetAllIssueAsync()
        {
            return await _issueRepository.GetAllIssueAsync();
        }
    }
}