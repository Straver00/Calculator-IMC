function calculateIMC() {
    var height = parseFloat(document.getElementById("height").value);
    var weight = parseFloat(document.getElementById("weight").value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0 ) {
        document.getElementById("result").innerHTML = "Por favor, ingresa valores válidos.";
        return;
    }
    if (height > 3 || weight > 700) {
        document.getElementById("result").innerHTML = "Por favor, ingresa valores realistas.";
        return;
    }

    var imc = weight / (height * height);
    var result = "";

    if (imc < 18.5) {
        result = "Bajo peso";
        document.getElementById("result_image").src = "contenido/bajo_peso.png";
    } else if (imc < 24.9) {
        result = "Normal";
        document.getElementById("result_image").src = "contenido/normal.png";
    } else if (imc < 29.9) {
        result = "Sobrepeso";
        document.getElementById("result_image").src = "contenido/sobrepeso.png";
    } else if (imc < 34.9) {
        result = "Obesidad Tipo 1";
        document.getElementById("result_image").src = "contenido/obesidad_tipo_1.png";
    } else if (imc < 39.9) {
        result = "Obesidad Tipo 2"
        document.getElementById("result_image").src = "contenido/obesidad_tipo_2.png";
    } else {
        result = "Obesidad Tipo 3"
        document.getElementById("result_image").src = "contenido/obesidad_tipo_3.png";
    }

    // Guardar datos (peso, altura, IMC) en el localStorage
    var currentDate = new Date().toISOString();
    var newData = {
        height: height,
        weight: weight,
        imc: imc.toFixed(2),
        result: result,
        date: currentDate
    };

    var data = localStorage.getItem('IMCData');
    if (data) {
        data = JSON.parse(data);
        data.push(newData);
    } else {
        data = [newData];
    }
    localStorage.setItem('IMCData', JSON.stringify(data));

    document.getElementById("result").innerHTML = "Tu IMC es: " + imc.toFixed(2) + ". Esto se clasifica como: " + result;
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";
}

function showProgress() {
    var data = localStorage.getItem('IMCData');
    if (data) {
        data = JSON.parse(data); 
        if (data.length > 3) {
            data.shift(); 
            localStorage.setItem('IMCData', JSON.stringify(data)); 
        }
        var progressHTML = "<h2>Historial de IMC</h2><ul>";
        data.forEach(function(entry) {
            // Formatear la fecha para mostrar solo YYYY-MM-DD
            var formattedDate = entry.date.split('T')[0];
            progressHTML += "<li>Fecha: " + formattedDate + ", Peso: " + entry.weight + " kg, Altura: " + entry.height + " m, IMC: " + entry.imc + ", Resultado: " + entry.result + ".</li>";
        });
        progressHTML += "</ul>";
        document.getElementById("progress").innerHTML = progressHTML;
    } else {
        document.getElementById("progress").innerHTML = "No hay datos de IMC almacenados.";
    }
}
