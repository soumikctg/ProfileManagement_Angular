using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using ProfilesApi.Models;



namespace ProfilesApi.Services
{
    public class StudentService
    {
        private readonly IMongoCollection<Student> _studentsCollection;
        private const string CollectionName = "Students";
        public StudentService(IOptions<DatabaseSettings> databaseSettings)
        {
            var dbClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var database = dbClient.GetDatabase(databaseSettings.Value.DatabaseName);
            _studentsCollection = database.GetCollection<Student>(CollectionName);

        }

        public async Task<long>GetNumOfDocuments()
        {
            return await _studentsCollection.CountDocumentsAsync(new BsonDocument());
        }
        public async Task CreateAsync(Student newStudent) => await _studentsCollection.InsertOneAsync(newStudent);

        public async Task CreateManyAsync(List<Student> students) =>
            await _studentsCollection.InsertManyAsync(students);

        public async Task<List<Student>> GetAsync() => await _studentsCollection.Find(_ => true).ToListAsync();

        public async Task<Student?> GetAsyncById(string id) =>
            await _studentsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<Student?> GetAsyncByName(string firstName) => await _studentsCollection.Find(x => x.FirstName == firstName).FirstOrDefaultAsync();

        public async Task<IEnumerable<Student>> PaginationAsync(int page, int pageSize) => await _studentsCollection
            .Find(_ => true).Skip((page - 1) * pageSize).Limit(pageSize).ToListAsync();


        public async Task UpdateAsync(string id, Student updatedStudent) =>
            await _studentsCollection.ReplaceOneAsync(x => x.Id == id, updatedStudent);

        public async Task RemoveAsyncById(string id) => await _studentsCollection.DeleteOneAsync(x => x.Id == id);

        public async Task RemoveAsync() => await _studentsCollection.DeleteManyAsync(_ => true);

    }
}
