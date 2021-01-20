using System.Threading;
using System.Threading.Tasks;
using API.Application.Pictures;
using API.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Mon_Ami.API.Controllers
{
    public class PicturesController : APIControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Picture>> Add([FromForm]Add.Command command, CancellationToken token)
        {
            Picture result = await Mediator.Send(command, token);
            return result;
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult<Unit>> Delete(string id, CancellationToken token)
        {
            Unit result = await Mediator.Send(new Delete.Command { Id = id }, token);
            return result;
        }

        [HttpPost("{Id}/SetMain")]
        public async Task<ActionResult<Unit>> Set(string id, CancellationToken token)
        {
            Unit result = await Mediator.Send(new SetMain.Command { Id = id }, token);
            return result;
        }
    }
}
