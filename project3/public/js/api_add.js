window.onload = () => {
    $("#btn-api").click(function () {
        let data = {
            type: $("#type").val(),
            address: $("#address").val(),
            area: $("#area").val(),
            room_count: $("#room_count").val(),
            rent: $("#rent").val()
        }

        $.post("./api/add", data, function (data) {
            $("#response").html(data);
        });
    });
}