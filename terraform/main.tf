terraform {
  required_version = "~> 0.12.0"

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "echosec"

    workspaces {
      name = "battlesnake-2020"
    }
  }
}

provider "digitalocean" {
  token = var.api_token
}

resource "digitalocean_ssh_key" "battlesnake_ssh_key" {
  name       = "battlesnake-ssh-key"
  public_key = var.droplet_ssh_key
}

resource "digitalocean_droplet" "battlesnake_droplet" {
  image    = "ubuntu-18-04-x64"
  name     = "echosec-battlesnake"
  region   = "nyc3"
  size     = "s-1vcpu-1gb"
  ssh_keys = [digitalocean_ssh_key.battlesnake_ssh_key.fingerprint]
}

resource "digitalocean_firewall" "battlesnake_firewall" {
  name = "battlesnake-firewall"

  droplet_ids = [digitalocean_droplet.battlesnake_droplet.id]

  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "22"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "80"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "443"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}
