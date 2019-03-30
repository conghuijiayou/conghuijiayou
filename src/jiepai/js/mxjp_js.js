$(document).ready(function () {

	$("#video_ok").click(function () {
		var Wwidth = $(window).width();
		if ($(window).width() > 770) {
			$("#video_spid").show();
			$("#video-1000").show();
			$("#video-770").hide();
		} else {
			$("#video_spid").show();
			$("#video-1000").hide();
			$("#video-770").show();
		}

	})

	$(".video_gb").click(function () {
		$("#video_spid").hide();
		$("#video-1000").hide();
		$("#video-770").hide();
		CKobject.getObjectById('ckplayer_a1').videoPause();
		$('video', '#video-770').get(0).pause();
	})

})
