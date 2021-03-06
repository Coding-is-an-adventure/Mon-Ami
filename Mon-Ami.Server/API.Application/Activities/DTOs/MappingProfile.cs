﻿using System.Linq;
using API.Domain;
using AutoMapper;

namespace API.Application.Activities.DTOs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDTO>();
            CreateMap<UserActivity, AttendeeDTO>()
                .ForMember(
                    destination => destination.Username,
                    option => option.MapFrom(source => source.AppUser.UserName))
                .ForMember(
                    destination => destination.DisplayName,
                    option => option.MapFrom(source => source.AppUser.DisplayName))
                .ForMember(
                    destination => destination.Image,
                    option => option.MapFrom(source => source.AppUser.Pictures.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}
