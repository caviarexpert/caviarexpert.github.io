provider "aws" {
  profile = "default"
  region = "eu-west-1"
}

terraform {
  backend "s3" {
    bucket = "cav-states"
    key    = "state"
    region = "eu-west-1"
    profile = "default"
  }
}