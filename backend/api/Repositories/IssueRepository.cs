using api.Data.Repositories;
using api.DTOs;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class IssueRepository : IIssueRepository, IDisposable
    {
        private readonly AppDbContext _context;

        public IssueRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddIssueAsync(Issue issue)
        {
            await _context.Issues.AddAsync(issue);
        }

        public async Task DeleteIssueAsync(Guid id)
        {
            var task = await _context.Issues.FindAsync(id);

            if (task != null)
            {
                _context.Remove(task);
            }
        }


        public async Task<List<Issue>> GetAllIssueAsync()
        {
            return await _context.Issues.ToListAsync();
        }

        public async Task<Issue?> GetIssueByIdAsync(Guid id)
        {
            return await _context.Issues.FindAsync(id);
        }

        public async Task UpdateIssueAsync(Issue issue)
        {
            _context.Issues.Update(issue);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public async Task UpdateStatusAsync(Issue issue)
        {
            _context.Issues.Update(issue);
        }
    }
}