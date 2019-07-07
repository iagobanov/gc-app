####### Start Helm and Minikube with add-ons #######
minikube start --memory 8000 --cpus 2 --vm-driver=kvm2
minikube addons enable heapster; minikube addons enable ingress
helm init --wait
helm repo update


# ####### Start Jenkins #######

#### BLOCK CREATED IN CASE OF USING JENKINS WITH HELM ####

# #1. Create Jenkins Namespace
# kubectl create -f $HOME/gc-test/kubernetes/jenkins/jenkins-namespace.yaml
# kubectl create -f $HOME/gc-test/kubernetes/jenkins/jenkins-volume.yaml

# helm install --name gc-jenkins -f $HOME/gc-test/kubernetes/jenkins/jenkins-values.yaml stable/jenkins --namespace gc-jenkins-ns

# #2. Get IP Login
# echo "Your jenkins IP"
# echo "$(minikube ip):$(kubectl describe service gc-jenkins --namespace gc-jenkins-ns | grep NodePort: | grep -Eo '[0-9]{1,5}')"

# #3. Get Jenkins Admin PW
# echo "You user gc-admin PW"
# printf $(kubectl get secret --namespace gc-jenkins-ns gc-jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo


####### Start Application #######
#1. Start DB
cd $HOME/jenkins-minikube/simple-microservice-typescript && kompose up

#2. Start Application
kubectl apply -f $HOME/gc-app/simple-microservice-typescript/docker-compose/templates/app-server-deployment.yaml
kubectl expose deployment gc-app --type NodePort --port 3000

echo "$(minikube ip):$(kubectl describe service app-server | grep NodePort: | grep -Eo '[0-9]{1,5}')"
