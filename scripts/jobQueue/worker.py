import json
import gearman
import requests

endpoint = "http://smsApi.com"
headers = {
    'content-type': 'application/json'
}

def sendBulkSMS(worker, job):
    print "new job started"
    #load json data
    data = json.loads(job.data)
    for number in data["numbers"]:
        print number, endpoint
        payload = {
            "form": {
                "MSISDN": number,
                "message": data['message']
            }
        }

        res = requests.post(endpoint, data = json.dumps(payload), headers = headers)
        # print res

    return "SMS sent"

print "worker is waiting for jobs"

# Conncet Gearman
gm_worker = gearman.GearmanWorker(['localhost:4730'])

# Register task
gm_worker.register_task('sendSMS', sendBulkSMS)

# Start work loop
gm_worker.work()
