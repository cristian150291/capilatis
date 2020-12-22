
// FUNCIONES CUSTOM PARA EL SISTEMA


/** PAGINADOR
 * @Observations : Paginador realiza la tarea de retorna las siguientes paginas
 * a mostrar de una grilla dependiendo lo solicitado. Muestra hasta 20 tuplas.
 *
 *  @param req : request de la solicitud del controlador
 *  @returns : 
 */

const paginador = ( req ) => {
	
	let actual = parseInt( req.body.pag );
	let inicioPagina = 1;
	let finalPagina = 15;
	let totalPagina = 15; // ESREDUNDANTE, PERO LO DEJO POR SI A FUTURO SE DECIDE ELEGIR AL USUARIO LA 
	//CANTIDAD DE PAGINAS.
	switch ( req.body.event ){
		case "next" : 
			inicioPagina = ( parseInt( req.body.pag ) * totalPagina ) - totalPagina;
		break;
		case "back":
			if ( parseInt( req.body.pag ) > 1 ){
				inicioPagina = ( parseInt( req.body.pag ) * totalPagina ) -  totalPagina * 2 ;
			}else{
				inicioPagina = 0 ;
				actual = 1;
			}
		break;
	}

	return {
		inicio : inicioPagina,
		final : finalPagina,
		pagActual : actual
	}
}

module.exports = {
	paginador : paginador
}
