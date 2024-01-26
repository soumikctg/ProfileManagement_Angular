using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ProfilesApi.Models
{
    public class Teacher
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Name { get; set; }
        public string Contact {  get; set; }
        public string Address { get; set; } 
        public string Department { get; set; }

    }
}
