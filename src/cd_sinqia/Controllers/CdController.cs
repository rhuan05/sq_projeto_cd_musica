using cd_sinqia.Repository;
using Microsoft.AspNetCore.Mvc;

namespace cd_sinqia.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CdController : Controller
    {

        public CdRepository _repository { get; set; }


        //Controller chamando pegando o repository
        public CdController()
        {
            _repository = new CdRepository();
        }

        //Métodos da controller
        [HttpGet("dados")]
        public IActionResult VerDados()
        {
            return Ok(_repository.VerDados());
        }

        [HttpPost("inserir")]
        public ActionResult InserirCd(Cd cd)
        {
            return Ok(_repository.InserirCd(cd));
        }

        [HttpPut("editar")]
        public ActionResult EditarCd(Cd cd, int id)
        {
            return Ok(_repository.EditarCd(cd, id));
        }

        [HttpDelete("excluir")]
        public ActionResult ExcluirCd(int id)
        {
            return Ok(_repository.ExcluirCd(id));
        }

    }
}
