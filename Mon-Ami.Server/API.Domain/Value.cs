using System.ComponentModel.DataAnnotations;

namespace API.Domain
{
    public class Value
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
    }
}
