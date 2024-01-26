using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProfilesApi.Models;
using ProfilesApi.Services;

namespace ProfilesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController(TeacherService teacherService) : ControllerBase
    {
        private readonly TeacherService _teacherService = teacherService;


        [HttpPost("AddTeacher")]
        public async Task<IActionResult> AddTeacher(Teacher newTeacher)
        {
            await _teacherService.CreateTeacherAsync(newTeacher);
            return CreatedAtAction(nameof(AddTeacher), newTeacher);
        }

        [HttpPost("AddTeachers")]
        public async Task<IActionResult> AddTeachers([FromBody] List<Teacher> teachers)
        {
            await _teacherService.CreateManyTeacherAsync(teachers);
            return CreatedAtAction(nameof(AddTeachers), teachers);
        }

        [HttpGet("GetTeachers")]
        public async Task<IActionResult> GetTeachers()
        {
            var teachers = await _teacherService.GetAllTeacherAsync();
            return Ok(teachers);
        }

        [HttpGet("GetTeacherById")]
        public async Task<IActionResult> GetTeacherById([FromQuery] string id)
        {
            var teacher = await _teacherService.GetTeacherAsyncById(id);
            if (teacher is null)
            {
                return NotFound();
            }
            return Ok(teacher);
        }

        [HttpGet("GetTeacherByName")]
        public async Task<IActionResult> GetTeacherByName([FromQuery] string name)
        {
            var teacher = await _teacherService.GetTeacherAsyncByName(name);
            if (teacher is null)
            {
                return NotFound();
            }
            return Ok(teacher);
        }

        [HttpGet("PaginationTeacher")]
        public async Task<IActionResult> GetPagedTeacher([FromQuery] int page, int pageSize)
        {
            var PagedTeacher = await _teacherService.TeacherPaginationAsync(page, pageSize);
            var pItem = new PageItem
            {
                Teachers = PagedTeacher.ToList(),
                Total = (int)await _teacherService.GetNumOfDocuments()
            };
            return Ok(pItem);
        }

        [HttpPut("UpdateTeacher")]
        public async Task<IActionResult> UpdateTeacher(string id, Teacher updatedTeacher)
        {
            var teacher = await _teacherService.GetTeacherAsyncById(id);
            if (teacher is null)
            {
                return NotFound();
            }

            updatedTeacher.Id = teacher.Id;
            await _teacherService.UpdateTeacherAsync(id, updatedTeacher);
            return Ok(updatedTeacher);

        }

        [HttpPatch("PartialUpdate")]
        public async Task<IActionResult> PartialUpdate(string id, Dto dtoTeacher)
        {
            var teacher = await _teacherService.GetTeacherAsyncById(id);
            if (teacher is null)
            {
                return NotFound();
            }

            teacher.Contact = dtoTeacher.Contact;
            teacher.Address = dtoTeacher.Address;

            await _teacherService.UpdateTeacherAsync(id, teacher);
            return Ok("Student Updated");
        }

        [HttpDelete("DeleteTeacher")]
        public async Task<IActionResult> DeleteTeacher(string id)
        {
            var teacher = await _teacherService.GetTeacherAsyncById(id);
            if (teacher is null)
            {
                return NotFound();
            }

            await _teacherService.RemoveTeacherByIdAsync(id);
            return Ok(teacher);
        }

        [HttpDelete("DeleteAllTeacher")]
        public async Task<IActionResult> DeleteAllStudent()
        {
            await _teacherService.RemoveAllTeacherAsync();
            return Ok("All Teachers Deleted");
        }

        [HttpPost("ImportTeachers")]
        public async Task<IActionResult> ImportTeachers([FromBody] List<Teacher> teachers)
        {
            await _teacherService.CreateManyTeacherAsync(teachers);
            return Ok("Teachers imported!");
        }
    }
}
