class Player
{
    constructor(name, health)
    {
        this.setName(name)
        this.health = health;
        
    }
    
setName(inputName) {
  if (inputName != null && inputName.trim() !== "") {
    this.name = inputName;
  } else {
    console.warn("Name cannot be empty or null.");
    // no alert here
  }
}


getName()
{
  return this.name;
}

takeDamage(damage)
{
    this.health -= damage;
}

increaseHealth(lifePoints)
{
    this.health += lifePoints;
}





}

export default Player

