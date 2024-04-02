var GradewiseDataSet = [], index = 0;
[[3,[1,2]], [4,[3,4]], [6,[5,6]]].forEach((value)=>{
	GradewiseDataSet.push({
		"Grade":value[1],
		"DataSet":[1,2,3,4,5].map((e)=>{ 
			index++;
			var QandA = [];
			for(i = 1; i <= value[0]; i++)
				QandA.push("Q"+index+"-"+i+".png")
			return {
			"QuestionCaption": "Sequence the Images in Order",
            "InputType": "Image",
            "OutputType": "Order",
            "Question": QandA,
            "Options": [],
            "Answer": QandA
		}; })
	})
	// index++;
})
print(JSON.stringify(GradewiseDataSet))