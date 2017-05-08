/*
	Controls SimpleDB domain
*/
resource "aws_simpledb_domain" "users" {
  name = "${var.domain}"
}

output "domain_id" {
	value = "${aws_simpledb_domain.users.id}"
}