// See https://aka.ms/new-console-template for more information
using System.Text.Json;
using System.Net.Http;

namespace profilesJson
{
    internal class Program
    {
        public static async Task Main()
        {

            string filePath = "students.json";

            string jsonContent = File.ReadAllText(filePath);

            List<Profile> profiles = JsonSerializer.Deserialize<List<Profile>>(jsonContent)!;

            
            // foreach (var profile in profiles)
            // {
            //     Console.WriteLine($"First Name: {profile.FirstName}");
            //     Console.WriteLine($"Last Name: {profile.LastName}");
            //     Console.WriteLine($"Contact: {profile.Contact}");
            //     Console.WriteLine($"Address: {profile.Address}");
            //     Console.WriteLine($"Department:{profile.Department}");
            //     Console.WriteLine();
            // }
            await ImportToApi(profiles);

            Console.ReadLine();
        }

        public static async Task ImportToApi(List<Profile> profiles)
        {
            string apiUrl = "http://localhost:5280/api/Student/ImportStudents";
            using (HttpClient client = new HttpClient())
            {
                string jsonData = JsonSerializer.Serialize(profiles);
                HttpContent content = new StringContent(jsonData, System.Text.Encoding.UTF8, "application/json");

                var response = await client.PostAsync(apiUrl, content);
                if(response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Profiles Imported successfully");
                }
                else
                {
                    Console.WriteLine($"Error importing Profiles: {response.StatusCode}");
                }
            }
        }
    }

    public class Profile
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Contact { get; set; }
        public string? Address { get; set; }
        public string? Department { get; set; }
    }
}
