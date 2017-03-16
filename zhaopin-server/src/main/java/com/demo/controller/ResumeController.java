package com.demo.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.model.*;
import com.demo.service.*;

@Controller
@RequestMapping("resume")
public class ResumeController {
	@Resource
	private ResumeService rs;	
	@Resource
	private LoginController lc;
	@Resource
	private EducationService es;
	@Resource
	private IntershipService is;
	@Resource
	private ProjectService ps;
	@Resource
	private HonorService hs;
	@ResponseBody
	@RequestMapping("/getResume")
	public Resume getResume(long id,HttpServletRequest req){
		Resume r=new Resume();
		r.setId(id);
		r=rs.getResumeById(r);
		Education e=new Education();
		e.setResume_id(id);
		r.setEducations(es.getEducations(e));
		Intership i=new Intership();
		i.setResume_id(id);
		r.setInterships(is.getInterships(i));
		Project p=new Project();
		p.setResume_id(id);
		r.setProjects(ps.getProjects(p));
		Honor h=new Honor();
		h.setResume_id(id);
		r.setHonors(hs.getHonors(h));
		return r;
	}
	
	@ResponseBody
	@RequestMapping("/getResumesName")
	public List<Resume> getResumesName(String thirdSessionKey,HttpServletRequest req){
		Resume r=new Resume();
		System.out.println(thirdSessionKey);
		System.out.println(req.getSession().getId());
		r.setSeeker_id(lc.getOpenid(thirdSessionKey, req));
		return rs.getResumesName(r);
	}
	
	/**
	 * 新增简历  
	 * @param thirdSessionKey
	 * @param req
	 * @return 返回简历id
	 */
	@ResponseBody
	@RequestMapping("/addResume")
	public Resume addResume(String thirdSessionKey,String name,HttpServletRequest req){
		Resume r=new Resume();
		r.setSeeker_id(lc.getOpenid(thirdSessionKey, req));
		r.setName(name);
		if(rs.addNewResume(r)){
			return rs.getNewestResumeName(r);
		}
		return null;
	}
	
	@ResponseBody
	@RequestMapping("/changeResumeName")
	public boolean changeResumeName(Long id,String name,HttpServletRequest req){
		Resume r=new Resume();
		r.setId(id);
		r.setName(name);
		return rs.updateResume(r);
	}
	
	@ResponseBody
	@RequestMapping("/deleteResume")
	public boolean deleteResume(Long id,HttpServletRequest req){
		Resume r=new Resume();
		r.setId(id);
		return rs.deleteResume(r);
	}
}
