/*
 * Copyright 2014 MOSPA(Ministry of Security and Public Administration).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package egovframework.com.cop.bbs.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import egovframework.com.cop.bbs.service.BoardVO;

/**
 * 엑셀파일을 생성하는 클래스를 정의한다.
 * @author 실행환경 개발팀 신혜연
 * @since 2011.07.11
 * @version 1.0
 * @see
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2011.07.11  신혜연          최초 생성
 *
 * </pre>
 */
public class EgovExcel extends AbstractExcelView {

	/**
	 * 엑셀파일을 설정하고 생성한다.
	 * @param model
	 * @param wb
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@Override
	protected void buildExcelDocument(Map<String, Object> model, HSSFWorkbook wb, HttpServletRequest request, HttpServletResponse response) throws Exception {

		response.setHeader("Content-Disposition", "attachment; filename=\"" + getClass().getSimpleName() + ".xls\"");

		HSSFCell cell = null;

		HSSFSheet sheet = wb.createSheet("Goods List");
		sheet.setDefaultColumnWidth(12);

		// put text in first cell
		cell = getCell(sheet, 0, 0);
		setText(cell, "Goods List");

		// set header information
		setText(getCell(sheet, 2, 0), "No.");
		setText(getCell(sheet, 2, 1), "NAME");
		setText(getCell(sheet, 2, 2), "PRICE");
		setText(getCell(sheet, 2, 3), "MAKER");

		List<BoardVO> goods = (List<BoardVO>) model.get("goodsList");
		System.out.println("@@@@@@@@@ "+goods);
		for (int i = 0; i < goods.size(); i++) {
			BoardVO goodsVO = goods.get(i);

			cell = getCell(sheet, 3 + i, 0);
			setText(cell, Integer.toString(i + 1));

			cell = getCell(sheet, 3 + i, 1);
			setText(cell, goodsVO.getBbsId());

			cell = getCell(sheet, 3 + i, 2);
			setText(cell, Integer.toString(goodsVO.getPageSize()));

			cell = getCell(sheet, 3 + i, 3);
			setText(cell, goodsVO.getBbsNm());

		}

	}

}
