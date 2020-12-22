/** CARGA DE DATOS GLOBALES PARA LA APLICACION
 * @Observations : Este modelo se utiliza para cargar datos globales de la aplicacion
 */

 /** URL SERVICE
  * @Observations : Exporto url que se utilizara para las peticiones de la aplicacion.
  */
 export var Global = {
    urlService : 'http://localhost:3700/api/',
    headers :  {
      'Content-Type':  'application/json', //x-www-form-urlencoded
    }
 };