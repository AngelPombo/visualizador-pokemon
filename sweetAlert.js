export { errorConexion };

function errorConexion (error){
    Swal.fire({
        title: "Oops!",
        text: error.message,
        icon: "error",
        confirmButtonText: '<a href="./index.html">Reload</a>',
        width: "20%",
        background: "#D4E6F1",
        backdrop: true,
        imageUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/0/0b/latest/20160904204605/Snorlax.png/800px-Snorlax.png",
    });
};