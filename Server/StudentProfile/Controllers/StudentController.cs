using Microsoft.AspNetCore.Mvc;
using ProfilesApi.Models;
using ProfilesApi.Services;

namespace ProfilesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController(StudentService studentService) : ControllerBase
    {
        private readonly StudentService _studentService = studentService;

        [HttpPost("AddStudent")]
        public async Task<IActionResult> AddStudent(Student newStudent)
        {
            await _studentService.CreateAsync(newStudent);
            return CreatedAtAction(nameof(AddStudent), newStudent);
        }

        [HttpPost("AddStudents")]
        public async Task<IActionResult> AddStudents([FromBody] List<Student> newStudents)
        {
            await _studentService.CreateManyAsync(newStudents);
            return CreatedAtAction(nameof(AddStudents), newStudents);
        }

        [HttpPost("ImportStudents")]
        public async Task<IActionResult> ImportStudents([FromBody] List<Student> students)
        {


            await _studentService.CreateManyAsync(students);

            return Ok("Students Imported Successfully");
        }
        

        [HttpGet("GetStudents")]
        public async Task<IActionResult> GetStudents()
        {
            var students = await _studentService.GetAsync();
            return Ok(students);
        }

        [HttpGet("GetStudentById")]
        public async Task<IActionResult> GetStudentById([FromQuery] string id)
        {
            var student = await _studentService.GetAsyncById(id);
            if (student is null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpGet("GetStudentByName")]
        public async Task<IActionResult> GetStudentByName([FromQuery] string name)
        {
            var student = await _studentService.GetAsyncByName(name);
            if (student is null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpGet("Pagination")]
        public async Task<IActionResult> StudentPagination([FromQuery] int page, [FromQuery] int pageSize)
        {

            var pagedStudents = await _studentService.PaginationAsync(page, pageSize);
            var pItem = new PageItem
            {
                Students = pagedStudents.ToList(),
                Total = (int)await _studentService.GetNumOfDocuments()
            };

            return Ok(pItem);
        }

        [HttpPut("UpdateStudent")]
        public async Task<IActionResult> UpdateStudent(string id, Student updatedStudent)
        {
            var student = await _studentService.GetAsyncById(id);
            if (student is null)
            {
                return NotFound();
            }

            updatedStudent.Id = student.Id;
            await _studentService.UpdateAsync(id, updatedStudent);
            return Ok(updatedStudent);
        }

        [HttpPatch("UpdateContact_&_Address")]
        public async Task<IActionResult> PartialUpdate(string id, [FromBody] Dto dtoStudent)
        {
            var student = await _studentService.GetAsyncById(id);
            if (student is null)
            {
                return NotFound();
            }
            student.Contact = dtoStudent.Contact;
            student.Address = dtoStudent.Address;

            await _studentService.UpdateAsync(id, student);

            return Ok("Student Updated");
        }



        [HttpDelete("DeleteStudent")]
        public async Task<IActionResult> DeleteStudent(string id)
        {
            var student = await _studentService.GetAsyncById(id);
            if (student is null)
            {
                return NotFound();
            }

            await _studentService.RemoveAsyncById(id);
            return Ok(student);
        }

        [HttpDelete("DeleteAllStudent")]
        public async Task<IActionResult> DeleteStudents()
        {
            await _studentService.RemoveAsync();
            return Ok("All Students Deleted");
        }
    }
}
