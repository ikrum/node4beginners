import json
import gearman
import smtplib
import email.message
import requests



#  define method to handle 'email' task
#  param job.data should be a json object
def sendEmail(worker, job):
	#load json data
	data = json.loads(job.data)
	print "sending email: "+data['to']

	# Gmail Login
	username = 'NodeGeek@gmail.com'
	password = '123445678'

	# mail data
	fromName = "NodeGeek"


	msg = email.message.Message()
	msg['Subject'] = data['subject']
	msg['From'] = fromName+' <' + username +'>'
	msg['To'] = data['to']

	msg.add_header('Content-Type','text/html')
	msg.set_payload(str(data['msg']))

	# Sending the mail
	try:
		server = smtplib.SMTP('smtp.gmail.com:587')
		server.starttls()
		server.login(username,password)

		# param: from,to,msg
		server.sendmail(msg['From'], msg['To'], msg.as_string())
		server.close()
		print "Email sent"
		return "Email sent"
	except:
		print "failed to send mail"
		return "failed to send mail"



def encodeVideo(worker, job):
	print "encoding video"


print "worker is waiting for jobs"

# Conncet Gearman
gm_worker = gearman.GearmanWorker(['localhost:4730'])


# Register task
gm_worker.register_task('email', sendEmail)
gm_worker.register_task('encodeVideo', encodeVideo)

# Start work loop 
gm_worker.work()