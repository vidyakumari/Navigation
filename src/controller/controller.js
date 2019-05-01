const userroles = require('../role')
const user = require('../user')
const jobs = require('../jobs')
//const jobsapplied = require('../role/jobsapplied')
//const appliedstatus = require('../role/appliedstatus')

//Create users
exports.user = (req, res) => {
  if (!!req.body.content) {
    return res.status(400).json({
      message: "users can not be empty"
    });
  } else {
    var roles;
  /*  if (req.route.path === '/admin') {
      roles = role[0].value
    }*/
    if (req.route.path === '/company') {
      roles = role[1].value
    } 
    if (req.route.path === '/user') {
      roles = userroles[2].value
    }
 
    console.log(req.body);
    const details = new user({
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      roles: roles
    });
    console.log(details)
    details.save()
      .then(data => {
        res.json({ data });
      }).catch(err => {
        res.json({
          message: err.message || "Some error occurred while creating the user."
        });
      });
  }
};

exports.login = async (req,res) => {
  console.log(req.body);
   email= req.body.email;
   password= req.body.password;
   try {
    const data = await user.findOne({'email': req.body.email, 'password': req.body.password})
    console.log(email, password, data)
    if(data.email === email && data.password === password){
      res.json(data)
      console.log("Successfully login");
    }
    else{
     res.json(null)
      console.log("Failed to login");
    }
   } catch (error) {
     res.json(null)
   }
};


exports.getuser = (req, res) => {
  user.find()
    .then(data => {
      res.status(200).json({ data });
    }).catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving users."
      });
    });
};

//Create jobposts
exports.jobs = async (req, res) => {
  const { email } = req.body;
  const checkIsValid = await user.findOne({ email })
  if (checkIsValid.roles === 2) {
    res.json({
      errorMessage: "only admin and company can post the job"
    })
  }
  else {
    const details = new jobs({
      Company: checkIsValid.fullname,
      Profile: req.body.Profile,
      Designation: req.body.Designation,
      Salary: req.body.Salary,
      City: req.body.City,
    });
    console.log(details)
    details.save()
      .then(data => {
        res.json({ data });
      }).catch(err => {
        res.json({
          message: err.message || "Some error occurred while creating the jobs."
        });
      });
  }
};


//Retrive jobposts
exports.getjobs = (req, res) => {
  jobs.find()
    .then(data => {
      res.json(data);
    }).catch(err => {
      res.json(err.message);
    });
};


// Update user
exports.userupdate = (req, res) => {
  if (!!req.body.content) {
    return res.status(400).json({
      message: "error on updating the user"
    });
  }

  user.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "user not found with id " + req.params.id
        });
      }
      res.status(200).json({ user });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "user not found with id " + req.params.id
        });
      }
      return res.status(500).json({
        message: "Error updating user with id " + req.params.id
      });
    });
};


// Delete user
exports.userdelete = (req, res) => {
  user.findByIdAndRemove(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "user not found with id " + req.params.id
        });
      }
      res.send({ message: "user deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).json({
          message: "user not found with id " + req.params.id
        });
      }
      return res.status(500).json({
        message: "Could not delete user with id " + req.params.id
      });
    });
};

// Update jobpost
exports.jobsupdate = (req, res) => {
  if (!!req.body.content) {
    return res.status(400).json({
      message: "jobpost content can not be empty"
    });
  }

  jobs.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, { new: true })
    .then(jobs => {
      if (!jobs) {
        return res.status(404).send({
          message: "jobpost not found with id " + req.params.id
        });
      }
      res.status(200).json({ jobs });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "jobpost not found with id " + req.params.id
        });
      }
      return res.status(500).json({
        message: "Error updating jobpost with id " + req.params.id
      });
    });
};

// Delete jobpost
exports.jobsdelete = (req, res) => {
  jobs.findByIdAndRemove(req.params.id)
    .then(jobs => {
      if (!jobs) {
        return res.status(404).json({
          message: "jobpost not found with id " + req.params.id
        });
      }
      res.send({ message: "jobpost deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).json({
          message: "jobpost not found with id " + req.params.id
        });
      }
      return res.status(500).json({
        message: "Could not delete jobpost with id " + req.params.id
      });
    });
};

//apply for a job 
exports.jobsapplied = async (req, res) => {
  try {
    const { email } = req.body
    var users = await user.findOne({ email })
    const { Company } = req.body
    var job = await jobs.findOne({ Company })
    var lat = users.location.coordinates[0]
    var long = users.location.coordinates[1]
  
    if(users.role !==2){
      throw new Error("only user can apply for the job")
    }
    var jobdist = await jobs.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lat, long] },
          $maxDistance: 5000
        }
      }
    }, (err, data) => {
      if (err)
        throw new Error(err)
      else {
        return data
      }
    })
    console.log(jobdist)
    const filterjob = jobdist.filter((job) => {
      if (job.Company === req.body.Company) {
        return job
      }
    })

    if (filterjob.length === 0) {
      throw new Error(req.body.Company + ' has no vacancies in your area')
    }
    if (jobdist.length === 0) {
      throw new Error("You can't apply for the job above 5km range")
    }

    const details = new jobsapplied({
      userDetails: {
        fullname: users.fullname,
        email: users.email,
        phone: users.phone,
        password: users.password,
        location: users.location,
        roles: users.roles
      },
      jobsDetails: {
        Company: job.Company,
        Profile: job.Profile,
        Designation: job.Designation,
        Salary: job.Salary,
        location: job.location
      },
      Status: appliedstatus[0].value
    })


    await details.save()
      .then(data => {
        res.status(201).json({
          "Message": "Successfully applied"
        })
      })
      .catch(err => {
        throw new Error(err)
      });
  }
  catch (err) {
    res.json({
      error: err.message
    })
  }

}

//Company can retrive the job applied details of their company by passing company name.
exports.getjobsapplied = (req, res) => {
  const { Company } = req.body;
  jobsapplied.find({ 'jobsDetails.Company': Company })
    .then(jobsapplied => {
      res.status(200).json({ jobsapplied });
    }).catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving jobsapplied."
      });
    });
};

/*exports.base64upload = (req, res) => {
    var base64Data = req.body.image.replace(/^data:image\/(?:jpeg|jpg|JPEG|JPG|png|PNG);base64,/, "");
    var filename = 'Images';
    let extension, lowerCaseData = base64Data.toLowerCase();
    if (lowerCaseData.indexOf('png') !== -1) {
        extension = '.png'
    } else if (lowerCaseData.indexOf('jpg') !== -1) {
        extension = '.jpg'
    } else if (lowerCaseData.indexOf('jpeg') !== -1) {
        extension = '.jpeg'
    }
    fs.writeFile('./pictures/' + filename + extension, base64Data, 'base64', function (err) {
        var imgdata = {
            fileName: filename,
            url: '/pictures/' + filename + extension,
            imageType: extension
        }

        user.updateMany({'fullN'},{},function (err) {
            if (err) {
                res.json(err);
            }
            res.json({
                success: true,
                path: '/pictures/' + filename + extension,
                fileName: filename,
                imageType: extension,
            })
        });
    });
}*/


