using api.DTOs;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssueController : ControllerBase
    {
        private readonly IIssueService _issueService;

        public IssueController(IIssueService issueService)
        {
            _issueService = issueService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var issues = await _issueService.GetAllIssueAsync();
            return Ok(issues);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Issue>> GetById(Guid id)
        {
            try
            {
                var issue = await _issueService.GetIssueByIdAsync(id);
                return Ok(issue);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(IssueDTO issueDTO)
        {
            var result = await _issueService.AddIssueAsync(issueDTO);

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(Guid id, UpdateStatusDTO updateStatusDTO)
        {
            try
            {
                await _issueService.UpdateStatus(id, updateStatusDTO.Status);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _issueService.DeleteIssueAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
