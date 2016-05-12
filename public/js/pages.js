var _pages = function(ids, pageClass, cntPerPage, pagesViewCnt, fnUpdatePage) {
	// pageClass: class for [<] 1 2 3 4 5 [>], not include "<,>"
	var idsInGroup,
			MAX = 1024*1024,
			current_page_id = 1,
			my_ids = ids;

	var createIdsInGroup = function() {
		// [1,2,3,4,5,6,7,8,9] -> [[1,2,3], [4,5,6], [7,8,9]]
		var idsInGroup = [], tempGroup= [];
		// ids.forEach(function(i) {
		for(var ii = 0; ii < my_ids.length; ii += 1) {
			var i = my_ids[ii];
			if (tempGroup.length == cntPerPage) {
				idsInGroup.push(tempGroup.concat());
				tempGroup = [i];
			} else {
				tempGroup.push(i);
			}
		}
		// });
		idsInGroup.push(tempGroup);
		return idsInGroup;
	};

	var rerangePage = function(id) {
		if (id > idsInGroup.length || id <= 0) return;
		var firstViewPageId = parseInt($(pageClass).first().text()),
				lastViewPageId  = parseInt($(pageClass).last().text());
		if (id < firstViewPageId) {
			firstViewPageId = firstViewPageId - pagesViewCnt;
			if (firstViewPageId < 1) firstViewPageId = 1;
		} else if(id > lastViewPageId) {
			firstViewPageId = id;
		}
		var v = firstViewPageId;
		$(pageClass).each(function() {
			// if (firstViewPageId <= idsInGroup.length || idsInGroup.length == 0) {
			if (v <= idsInGroup.length) {
				$(this).show();
				$(this).text(v);
				v += 1;
			} else {
				$(this).hide();
				$(this).text(MAX);
			}
		});
		_tell(idsInGroup);
		_tell(id);
		fnUpdatePage(idsInGroup[id-1]);

		// for fk project
		/*
		$(pageClass).each(function() {
			$(this).parent().removeClass(currentPageClass);
		});
		$(pageClass).eq(id-firstViewPageId).parent().addClass(currentPageClass);
		*/
	};

	// 测试
	$(pageClass).click(function() {
		var id = parseInt($(this).text());
		current_page_id = id;
		rerangePage(id);
	});

	$(pageClass+"_prev").click(function() {
		var id = current_page_id -1;
		rerangePage(id);
	});

	$(pageClass+"_next").click(function() {
		var id = current_page_id +1;
		rerangePage(id);
	});
	// end of 测试

	var Init = function(ids) {
		my_ids = ids;
		idsInGroup = createIdsInGroup();
		rerangePage(1);
	};

	var append = function(id) {
		my_ids.push(id);
		idsInGroup = createIdsInGroup();
		rerangePage(1);
	};

	// interface
	idsInGroup = createIdsInGroup();
	rerangePage(1);
	return {
		"idsInGroup": idsInGroup,
		"rerangePage": rerangePage,
		"reInit": Init,
		"append": append
	};
};

function _page_test() {
	var v = _pages([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], ".page", 3, 5, function() {});
	_tell(v.idsInGroup)
}
