using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("secure")]
[Authorize]
public class SecureController : ControllerBase
{
    [HttpGet]
    public IActionResult GetSecret()
    {
        return Ok("This is a protected endpoint");
    }
}
