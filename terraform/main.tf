module "simpledb" {
  source = "simpledb/"
  domain = "${var.aws_simpledb_domain}"
}

output "SimpleDB" {
	value = "${module.simpledb.domain_id}"
}