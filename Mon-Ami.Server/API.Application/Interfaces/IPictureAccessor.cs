using API.Application.Pictures;
using Microsoft.AspNetCore.Http;

namespace API.Application.Interfaces
{
    public interface IPictureAccessor
    {
        PictureUploadResult AddPicture(IFormFile file);

        string DeletePicture(string publicId);
    }
}
