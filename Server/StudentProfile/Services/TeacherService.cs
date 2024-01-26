using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using ProfilesApi.Models;

namespace ProfilesApi.Services
{
    public class TeacherService
    {
        private readonly IMongoCollection<Teacher> _teachersCollection;
        private const string CollectionName = "Teachers";

        public TeacherService(IOptions<DatabaseSettings> databaseSettings)
        {
            var dbClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var database = dbClient.GetDatabase(databaseSettings.Value.DatabaseName);
            _teachersCollection = database.GetCollection<Teacher>(CollectionName);
        }

        public async Task<long> GetNumOfDocuments()
        {
            return await _teachersCollection.CountDocumentsAsync(new BsonDocument());
        }
        public async Task CreateTeacherAsync(Teacher newTeacher) =>
            await _teachersCollection.InsertOneAsync(newTeacher);

        public async Task CreateManyTeacherAsync(List<Teacher> teachers) =>
            await _teachersCollection.InsertManyAsync(teachers);

        public async Task<List<Teacher>> GetAllTeacherAsync() => await _teachersCollection.Find(_ => true).ToListAsync();

        public async Task<Teacher> GetTeacherAsyncById(string id) =>
            await _teachersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<Teacher> GetTeacherAsyncByName(string name) =>
            await _teachersCollection.Find(x => x.Name == name).FirstOrDefaultAsync();


        public async Task<IEnumerable<Teacher>> TeacherPaginationAsync(int page, int pageSize) =>
            await _teachersCollection.Find(_ => true).Skip((page - 1) * pageSize).Limit(pageSize).ToListAsync();


        public async Task UpdateTeacherAsync(string id, Teacher updatedTeacher) =>
            await _teachersCollection.ReplaceOneAsync(x => x.Id == id, updatedTeacher);

        public async Task RemoveTeacherByIdAsync(string id) =>
            await _teachersCollection.DeleteOneAsync(x => x.Id == id);

        public async Task RemoveAllTeacherAsync() => await _teachersCollection.DeleteManyAsync(_ => true);
    }
}
