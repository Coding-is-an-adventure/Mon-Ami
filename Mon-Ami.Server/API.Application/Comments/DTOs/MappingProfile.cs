using System.Linq;
using API.Domain;
using AutoMapper;

namespace API.Application.Comments.DTOs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Comment, CommentDTO>()
                .ForMember(
                    destination => destination.Username,
                    option => option.MapFrom(source => source.Author.UserName))
                .ForMember(
                    destination => destination.DisplayName,
                    option => option.MapFrom(source => source.Author.DisplayName))
                .ForMember(
                    destination => destination.Image,
                    option => option.MapFrom(source => source.Author.Pictures.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}
