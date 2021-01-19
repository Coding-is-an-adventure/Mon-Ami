using API.Application.Interfaces;
using API.Application.Pictures;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Pictures
{
    public class PictureAccessor : IPictureAccessor
    {
        public PictureAccessor()
        {
            // d
        }

        public PictureUploadResult AddPicture(IFormFile file)
        {
            throw new System.NotImplementedException();
        }

        public string DeletePicture(string publicId)
        {
            throw new System.NotImplementedException();
        }
    }
}
