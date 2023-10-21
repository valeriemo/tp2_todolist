<?php
// Si le paramètre $_GET["orderby"] existe, écrire une requete slq qui ordonne les tâches selon le bon ordre.


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

try {
    if (isset($_GET) && isset($_GET["order"])) {
        $orderBy = $_GET["order"];
    } else {
        http_response_code("404");
        $message = array("message" => "Vous devez définir l'ordre de triage.");
        echo json_encode($message);
        exit();
    }

    $connexion = new mysqli("localhost", "root", "", "todolist", 3306);
    if (mysqli_connect_error()) {
        throw new Exception("Impossible de se connecter à la DB");
    }
    $requete = "SELECT * FROM taches ORDER BY $orderBy ASC";
    $stmt = $connexion->prepare($requete);
    if ($stmt->execute()) {
        $data = $stmt->get_result();
        $stmt->close();

        if ($connexion) {
            $connexion->close();
        }

        header("Content-type: application/json;");
        http_response_code(200);
        echo json_encode($data->fetch_all(MYSQLI_ASSOC));
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Impossible de récupérer les données"]);
    }
} catch (Exception $e) {

    http_response_code(500);
    echo json_encode(["erreur" => $e->getMessage()]);
    throw new Exception($e->getMessage());
}
