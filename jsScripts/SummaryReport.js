function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$(document).ready(async ()=>{
    $.fn.dataTable.ext.errMode = 'none';
    var TableAPI = {
        "aoColumns":[
            { mData: "", "width":"9%", className:"details-control" },
            { mData: "Category", "width":"9%"}, 
            {mData: "Percentage", "width":"10%", render:(data)=>{ return data.toFixed(2) }}, 
            { mData: "Result", className:"text-right", render:(data, row, rowData)=>{ return rowData.Percentage <= 35 ? "<b style='color:#FF0099;'>Severe</b>" : rowData.Percentage > 35 && rowData.Percentage <= 50 ? "<b style='color:#CC0099;'>Average</b>" : "<b style='color:green;'>Pass</b>" } }
        ],
        "scrollX":true,
        "paging": false,
        "searching": false,
        "ordering": false,
        "info": false,
        "autoWidth": false,
        "responsive": false,
    };
    console.log(TableAPI)
    $('table').DataTable(TableAPI)
    var AjaxResult = await AjaxScripts('TotalPercentage', { ChildDetails:JSON.parse(localStorage.ChildDetails) }, 'TotalPercentage')
    console.log(AjaxResult.data)
    var Result = [], PieData = [], BarData = [], PercentageTotal = 0;
    var Categories = [...new Map(AjaxResult.data[0].Answer.map((x) => [x['Category'], x])).values()].map((e)=>e.Category);
    Categories.forEach((value, index)=>{
        AnswerSet = AjaxResult.data[0].Answer.filter((e)=>{ return e.Category === value });
        var TotalScore = AnswerSet.map((e)=>{ return Number(1) }).reduce((a, b)=>{ return a + b },0);
        var Scored = AnswerSet.filter((e)=>Number(e.Score) === 1).map((e)=>{ return Number(e.Score) }).reduce((a, b)=>{ return a + b },0)
        var Percentage = (Scored/TotalScore) * 100;
        PieData.push({
            value: Percentage == 0 ? 1 : Percentage,
            color:getRandomColor(),
            label:value
        })
        BarData.push(Percentage)
        Result.push({
            Category:value,
            AnswerSet:AnswerSet,
            TotalScore:TotalScore,
            Scored:Scored,
            Percentage:Percentage,
        })
        PercentageTotal += Percentage;
    })
    PercentageTotal /= Result.length;
    var Message = PercentageTotal <= 35 ? "<b style='color:#FF0099;'>Severe</b>" : PercentageTotal > 35 && PercentageTotal <= 50 ? "<b style='color:#CC0099;'>Average</b>" : "<b style='color:green;'>Pass</b>";
    // $('#Message').html("Overall Result : "+Message)
    new Chart(document.getElementById("countries").getContext("2d")).Pie(PieData, {});
    var barData = {
        labels : Categories,
        datasets : [
            {
                fillColor : getRandomColor(),
                strokeColor : getRandomColor(),
                data : BarData
            }
        ]
    }
    // get bar chart canvas
    var income = document.getElementById("income").getContext("2d");
    // draw bar chart
    
    new Chart(income).Bar(barData);

    localStorage.setItem('Result', JSON.stringify(Result))
    localStorage.setItem('BarPieChart', JSON.stringify({ BarChart:(barData), PieData:(PieData) }))
    $('table').DataTable().rows.add(Result).draw()
    $('table tbody').on('click', 'td.details-control', function(e){
        var tr = $(e.target).parent();
        var row = $('#SummaryTable').DataTable().row(tr)
        var SubTableID = "Inner1_"+(Math.floor(Math.random() * 100000) + 1);
        if ( row.child.isShown() ) {
            row.child.hide();
            console.log(tr)
            tr.removeClass('shown');
            $('#'+SubTableID+"_wrapper").DataTable().destroy();
            $('#'+SubTableID+"_wrapper").remove()
        }
        var SubTableAPI = {
            dom: "t",
        };
        var SubTableKey = row.data()['AnswerSet'];
        SubTableAPI['data'] = SubTableKey;
        ChildColumns = [
            { mData: "Type", "width":"9%" },
            { mData: "Score", className:"text-right", render:(data)=>{ return "<b style='color:"+(data == 1 ? 'green' : data == 0 ? 'blue' : 'red')+";'>"+data+"</b>" }}
        ]
        // ChildColumns = JSON.parse("["+Object.keys(SubTableKey[0]).map(el => '{"data":"'+ el + '", "title":"'+el+'"}')+"]");
        SubTableAPI['columns'] = ChildColumns;
    
        var childTable = '<table cellpadding="5" cellspacing="0" border="1" width="70%" id="'+SubTableID+'" class="thead-dark" align="center"><thead><tr><th>Type</th><th class="text-right">Score</th></tr></thead></table>';
        row.child( $(childTable).toArray() ).show();
        childTable = $('#'+SubTableID).DataTable(SubTableAPI);
        tr.addClass('shown');
    });
    notifications('info', 'Disclaimer!<br/>This app is intended for screening purposes. The result is not an indication of SLD in the child, If you\'re concerned that your kid may have SLD please discuss your concern with health professionals', 'CenterBig', {})
    $('.swal2-title').css({ "font-size":"3vh" })
})