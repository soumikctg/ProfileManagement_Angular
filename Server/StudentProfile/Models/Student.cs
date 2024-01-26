using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProfilesApi.Models
{
    public class Student
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Contact { get; set; }
        public string Address { get; set; }
        public string Department { get; set; }
    }
}
