using System.Text.Json;

namespace profilesJson
{
    internal class Program
    {
        public static async Task Main()
        {

            string filePath = "teacher.json";

            string jsonContent = File.ReadAllText(filePath);

            List<Teacher> teachers = JsonSerializer.Deserialize<List<Teacher>>(jsonContent)!;

            await ImportToApi(teachers);

            Console.ReadLine();
        }

        public static async Task ImportToApi(List<Teacher> teachers)
        {
            string apiUrl = "http://localhost:5280/api/Teacher/ImportTeachers";
            using (HttpClient client = new HttpClient())
            {
                string jsonData = JsonSerializer.Serialize(teachers);
                HttpContent content = new StringContent(jsonData, System.Text.Encoding.UTF8, "application/json");

                var response = await client.PostAsync(apiUrl, content);
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Teachers Imported successfully");
                }
                else
                {
                    Console.WriteLine($"Error importing Teachers: {response.StatusCode}");
                }
            }
        }
    }

    public class Teacher
    {
        public string? Name { get; set; }
        public string? Contact { get; set; }
        public string? Address { get; set; }
        public string? Department { get; set; }
    }
}

