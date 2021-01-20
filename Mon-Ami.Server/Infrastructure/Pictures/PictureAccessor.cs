using System;
using System.IO;
using API.Application.Interfaces;
using API.Application.Pictures;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Pictures
{
    public class PictureAccessor : IPictureAccessor
    {
        private readonly Cloudinary _cloudinary;

        public PictureAccessor(IOptions<CloudinarySettings> configuration)
        {
            Account account = new Account
            (
                configuration.Value.CloudName,
                configuration.Value.ApiKey,
                configuration.Value.ApiSecret
            );

            // Login to cloudinary using the secret credentials
            _cloudinary = new Cloudinary(account);
        }

        public PictureUploadResult AddPicture(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            // Check if the file is not empty.
            if (file.Length > 0)
            {
                /* Avoid large allocations by disposing the
                 * in memory object after it's uploaded to the cloud
                */
                using (Stream stream = file.OpenReadStream())
                {
                    var uploadParameters = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation()
                                                .Height(500)
                                                .Width(500)
                                                .Crop("fill")
                                                .Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParameters);
                }
            }

            if (uploadResult.Error != null)
            {
                throw new Exception(uploadResult.Error.Message);
            }

            return new PictureUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.AbsoluteUri
            };
        }

        public string DeletePicture(string publicId)
        {
            var deleteParameters = new DeletionParams(publicId);

            var result = _cloudinary.Destroy(deleteParameters);

            return result.Result == "ok" ? result.Result : null;
        }
    }
}
