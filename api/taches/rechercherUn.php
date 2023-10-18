<?php 

ini_set('display_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    if (isset($_GET) && isset($_GET["id"])) {
        $id = $_GET["id"];
    } else {
        http_response_code("404");
        $message = array("message" => "Vous devez définir le id de la tâche à rechercher.");
        echo json_encode($message);
        exit();
    }

    $connexion = mysqli_connect("localhost", "root", "", "todolist", 3306);

    if ($connexion == false) {
        // La connexion n'a pas fonctionnée
        die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
    }

    $requete = "SELECT * from taches WHERE id='$id'";
    $stmt = $connexion->prepare($requete);

    if ($stmt->execute()) {
        $results = $stmt->get_result();
        echo json_encode($results->fetch_all(MYSQLI_ASSOC));
        $stmt->close();

        $connexion->close();
        exit();
    }
} catch (Exception $erreur) {
    http_response_code(500);
    $message = array("message" => $erreur->getMessage());

    echo json_encode($message);
}