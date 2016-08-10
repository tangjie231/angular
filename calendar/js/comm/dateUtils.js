/**
 * Created by jie.tang on 2016/1/18.
 */
define([],function() {
	var datePatterns = [
		{hasTime:false,"pattern":/^\d{4}-\d{2}-\d{2}$/},
		{hasTime:true,"pattern":/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/},
		{hasTime:true,"pattern":/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/}
	]
	var dateUtils = {
		stringToDate: function (dateStr){
			for(var i=0;i<datePatterns.length;i++){
				var currPattern = datePatterns[i];
				if(currPattern.pattern.test(dateStr)){
					if(!currPattern.hasTime){
						var dateArrs = dateStr.split('-');
						return new Date(dateArrs[0],parseInt(dateArrs[1]-1),dateArrs[2]);
					}else{
						var tempArrs = dateStr.split(' ');
						var dateArrs = tempArrs[0].split('-');
						var timeArrs = tempArrs[1].split(":");
						if(timeArrs.length>2){
							return new Date(dateArrs[0],parseInt(dateArrs[1]-1),dateArrs[2],timeArrs[0],timeArrs[1],timeArrs[2]);

						}else{
							return new Date(dateArrs[0],parseInt(dateArrs[1]-1),dateArrs[2],timeArrs[0],timeArrs[1],0)
						}
					}
				}
			}
			return null;
		},
		dateDiff:function(beginDate,endDate){//2个日期的时间差 天
			return parseInt(Math.floor(endDate -beginDate )  /  1000  /  60  /  60  /24)+1
		},
		dateDiffByMinute:function(beginDate,endDate){//2个日期的时间差 分钟
			return parseInt(Math.floor(endDate -beginDate )  /  1000  /  60 )
		},
		dateDiffWithHourAndMin:function(beginDate,endDate){
			var ms = endDate-beginDate;
			var ss = 1000;
			var mi = parseInt(ss * 60);
			var hh = parseInt(mi * 60);
			var dd = parseInt(hh * 24);
			var day = parseInt(ms / dd);
			var hour = parseInt((ms - day * dd) / hh);
			var minute = parseInt((ms - day * dd - hour * hh) / mi);
			hour+=parseInt(day*24);
			return {'hour':hour,'minute':minute};
		}
	}

	return dateUtils;
})