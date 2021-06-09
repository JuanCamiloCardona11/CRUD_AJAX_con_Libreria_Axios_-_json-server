const d = document,
   $table = d.querySelector(".crud-table"),
   $form = d.querySelector("#crud-form"),
   $title = d.querySelector(".crud__subtitle"),
   $template = d.getElementById("crud-template").content,
   $fragment = d.createDocumentFragment();

const obtenerPersonas = async () => {
   try{
      let res = await axios.get("http://localhost:3000/personas"),
         json = await res.data;
         console.log(json);

         json.forEach(elem => {
         $template.querySelector(".nombre").textContent = elem.nombre;
         $template.querySelector(".cedula").textContent = elem.cedula;
         $template.querySelector(".edad").textContent = elem.edad;
         $template.querySelector(".genero").textContent = elem.genero;
         $template.querySelector(".estatura").textContent = elem.estatura;
         $template.querySelector(".estCivil").textContent = elem.estCivil;

         //PARA LOS BOTONES de editar y eliminar

         //Para el botón de editar -> Creamos un data-atributte en el botón por cada atributo  
         //de cada persona y le asignamos el valor que venga en dicha propiedad, así:
         let $botonEditar = $template.querySelector(".editar");
         $botonEditar.dataset.id = elem.id;
         $botonEditar.dataset.nombre = elem.nombre;
         $botonEditar.dataset.cedula = elem.cedula;
         $botonEditar.dataset.edad = elem.edad;
         $botonEditar.dataset.genero = elem.genero;
         $botonEditar.dataset.estatura = elem.estatura;
         $botonEditar.dataset.estCivil = elem.estCivil;

         //Para el botón de eliminar -> Sólo requerimos un data atributte con el id de la persona
         let $botonEliminar = $template.querySelector(".eliminar");
         $botonEliminar.dataset.id = elem.id;

         let $clone = d.importNode($template,true);
         $fragment.append($clone);
      });
      $table.querySelector("tbody").appendChild($fragment);

   } catch(error) {
      let mensaje = error.statusText || "Ha ocurrido un error";
      alert(`Error ${error}: ${mensaje}`);
   }
}

d.addEventListener("submit" , async e => {
   if(e.target === $form){
      e.preventDefault();

      if(!e.target.id.value){
         //CREATE -> POST
         try{
               let options = {
                  method: "POST",
                  headers:{
                     "Content-type": "application/json; charset=utf-8"
                  },
                  data: JSON.stringify({
                     nombre: e.target.nombre.value, //Así obtenemos los valores
                     cedula:e.target.cedula.value,  //de los campos de entrada
                     edad:e.target.edad.value,      //de un formulario.
                     genero:e.target.genero.value,
                     estatura:e.target.estatura.value,
                     estCivil:e.target.estCivil.value
                  })
               }
               let res = await axios("http://localhost:3000/personas", options),
               json = await res.data;
               location.reload();
         }catch(error){
               let mensaje = error.statusText || "Ha ocurrido un error";
               alert(`Error ${error.status}: ${mensaje}`);
         }
      } else {
         //UPDATE -> PUT
         try{
               let options = {
                  method: "PUT",
                  headers:{
                     "Content-type": "application/json; charset=utf-8"
                  },
                  data: JSON.stringify({
                     nombre: e.target.nombre.value, //Así obtenemos los valores
                     cedula:e.target.cedula.value,  //de los campos de entrada
                     edad:e.target.edad.value,      //de un formulario.
                     genero:e.target.genero.value,
                     estatura:e.target.estatura.value,
                     estCivil:e.target.estCivil.value
                  })
               }
               let res = await axios(`http://localhost:3000/personas/${e.target.id.value}`, options),
               json = await res.data;
               location.reload();
         } catch(error) {
               let mensaje = error.statusText || "Ha ocurrido un error";
               alert(`Error ${error.status}: ${mensaje}`);
         }
      }
   }
});

d.addEventListener("click", async e => {
   if(e.target.matches(".editar")){
      $form.id.value = e.target.dataset.id;
      $title.textContent = "Editar Persona";
      $form.nombre.value = e.target.dataset.nombre;
      $form.cedula.value = e.target.dataset.cedula;
      $form.edad.value = e.target.dataset.edad;
      $form.genero.value = e.target.dataset.genero;
      $form.estatura.value = e.target.dataset.estatura;
      $form.estCivil.value = e.target.dataset.estCivil;
   }
   if(e.target.matches(".eliminar")){
      let confirEliminacion = confirm(`Estás seguro de eliminar la persona con id ${e.target.dataset.id}?`);
      if(confirEliminacion){
         //DELETE
         try{
               let options = {
                  method: "DELETE",
                  headers:{
                     "Content-type": "application/json; charset=utf-8"
                  }
               }
               let res = await axios(`http://localhost:3000/personas/${e.target.dataset.id}`, options),
               json = await res.data;
               location.reload();
         } catch(error) {
               let mensaje = error.statusText || "Ha ocurrido un error";
               alert(`Error al intentar eliminar la persona: ${error}: ${mensaje}`);
         }
      }
   }
});

d.addEventListener("DOMContentLoaded" , obtenerPersonas);

